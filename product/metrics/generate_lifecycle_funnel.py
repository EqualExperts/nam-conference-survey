#!/usr/bin/env python3
"""Generate iteration lifecycle Sankey chart showing progression through PM stages."""

import json
from datetime import datetime
from collections import defaultdict
from pathlib import Path

try:
    import plotly.graph_objects as go
except ImportError:
    print("Error: plotly required. Install with:")
    print("  pip install plotly kaleido")
    exit(1)

def generate_lifecycle_funnel(start_date_str=None, end_date_str=None):
    """Generate lifecycle Sankey from timing log."""

    script_dir = Path(__file__).parent
    timing_log = script_dir / "timing-log.jsonl"

    # Parse dates
    end_date = datetime.now().date() if not end_date_str else datetime.strptime(end_date_str, "%Y-%m-%d").date()
    start_date = None if not start_date_str else datetime.strptime(start_date_str, "%Y-%m-%d").date()

    # Read timing log
    activities = []
    with open(timing_log, 'r') as f:
        for line in f:
            line = line.strip()
            if line:
                activities.append(json.loads(line))

    # Group by iteration
    iterations = defaultdict(set)
    for a in activities:
        ts = datetime.fromisoformat(a['timestamp'].replace('Z', '+00:00')).date()

        # Apply date filter
        if start_date and ts < start_date:
            continue
        if ts > end_date:
            continue

        iteration = a.get('iteration')
        if iteration:  # Skip entries with null iteration
            iterations[iteration].add(a['command'])

    # Define stages in order
    stages = [
        ('/iter', 'Started'),
        ('/synth', 'Synthesized'),
        ('/req', 'Requirements'),
        ('/rel', 'Released'),
    ]

    # Count iterations reaching each stage
    stage_counts = {}
    for cmd, label in stages:
        count = sum(1 for cmds in iterations.values() if cmd in cmds)
        stage_counts[label] = count

    total_iterations = len(iterations)

    # Calculate flows between stages (and drop-offs)
    started = stage_counts['Started']
    synthesized = stage_counts['Synthesized']
    requirements = stage_counts['Requirements']
    released = stage_counts['Released']

    stalled_at_started = started - synthesized
    stalled_at_synth = synthesized - requirements
    stalled_at_req = requirements - released

    # Build Sankey data
    # Nodes: Started, Synthesized, Requirements, Released, + stalled nodes
    node_labels = [
        f"Started ({started})",
        f"Synthesized ({synthesized})",
        f"Requirements ({requirements})",
        f"Released ({released})",
    ]

    # Add stalled nodes if there are any
    if stalled_at_started > 0:
        node_labels.append(f"Stalled at Start ({stalled_at_started})")
    if stalled_at_synth > 0:
        node_labels.append(f"Stalled at Synth ({stalled_at_synth})")
    if stalled_at_req > 0:
        node_labels.append(f"Stalled at Req ({stalled_at_req})")

    # Node colors - EE brand
    node_colors = [
        '#1795d4',  # Started - Primary Blue
        '#22567c',  # Synthesized - Navy
        '#2c3234',  # Requirements - Charcoal
        '#6b8e23',  # Released - Olive
    ]
    # Gray for stalled nodes
    if stalled_at_started > 0:
        node_colors.append('#cccccc')
    if stalled_at_synth > 0:
        node_colors.append('#cccccc')
    if stalled_at_req > 0:
        node_colors.append('#cccccc')

    # Links (source, target, value)
    links_source = []
    links_target = []
    links_value = []
    links_color = []

    stalled_idx = 4  # Starting index for stalled nodes

    # Started -> Synthesized (continuing)
    if synthesized > 0:
        links_source.append(0)
        links_target.append(1)
        links_value.append(synthesized)
        links_color.append('rgba(34, 86, 124, 0.4)')  # Navy semi-transparent

    # Started -> Stalled (drop-off)
    if stalled_at_started > 0:
        links_source.append(0)
        links_target.append(stalled_idx)
        links_value.append(stalled_at_started)
        links_color.append('rgba(200, 200, 200, 0.4)')
        stalled_idx += 1

    # Synthesized -> Requirements (continuing)
    if requirements > 0:
        links_source.append(1)
        links_target.append(2)
        links_value.append(requirements)
        links_color.append('rgba(44, 50, 52, 0.4)')  # Charcoal semi-transparent

    # Synthesized -> Stalled (drop-off)
    if stalled_at_synth > 0:
        links_source.append(1)
        links_target.append(stalled_idx)
        links_value.append(stalled_at_synth)
        links_color.append('rgba(200, 200, 200, 0.4)')
        stalled_idx += 1

    # Requirements -> Released (continuing)
    if released > 0:
        links_source.append(2)
        links_target.append(3)
        links_value.append(released)
        links_color.append('rgba(107, 142, 35, 0.4)')  # Olive semi-transparent

    # Requirements -> Stalled (drop-off)
    if stalled_at_req > 0:
        links_source.append(2)
        links_target.append(stalled_idx)
        links_value.append(stalled_at_req)
        links_color.append('rgba(200, 200, 200, 0.4)')

    # Create Sankey diagram
    date_range = "All time" if not start_date else f"{start_date} to {end_date}"

    fig = go.Figure(data=[go.Sankey(
        node=dict(
            pad=20,
            thickness=30,
            line=dict(color="white", width=1),
            label=node_labels,
            color=node_colors,
        ),
        link=dict(
            source=links_source,
            target=links_target,
            value=links_value,
            color=links_color,
        )
    )])

    # Build iteration status for subtitle
    iteration_names = sorted(iterations.keys())
    details = []
    for name in iteration_names:
        cmds = iterations[name]
        if '/rel' in cmds:
            status = "Released"
        elif '/req' in cmds:
            status = "In Progress"
        elif '/synth' in cmds:
            status = "In Progress"
        else:
            status = "Stalled"
        short_name = name.split('-', 3)[-1] if '-' in name else name
        details.append(f"{short_name} ({status})")

    fig.update_layout(
        title=dict(
            text=f"Iteration Lifecycle Flow<br><sup>{total_iterations} iterations ({date_range})</sup>",
            font=dict(size=18),
        ),
        font=dict(size=12, family="Arial"),
        height=500,
        width=900,
        annotations=[
            dict(
                text="  |  ".join(details),
                x=0.5,
                y=-0.1,
                xref="paper",
                yref="paper",
                showarrow=False,
                font=dict(size=10, color="gray"),
            )
        ]
    )

    # Save outputs
    output_png = script_dir / "lifecycle_funnel.png"
    output_svg = script_dir / "lifecycle_funnel.svg"
    output_html = script_dir / "lifecycle_funnel.html"

    fig.write_image(str(output_png), scale=2)
    fig.write_image(str(output_svg))
    fig.write_html(str(output_html))

    print(f"Charts saved:")
    print(f"  {output_png}")
    print(f"  {output_svg}")
    print(f"  {output_html}")
    print(f"\nSummary:")
    print(f"  Total iterations: {total_iterations}")
    print(f"  Date range: {date_range}")
    print(f"\nFlow:")
    print(f"  Started: {started}")
    print(f"  → Synthesized: {synthesized} ({stalled_at_started} stalled)")
    print(f"  → Requirements: {requirements} ({stalled_at_synth} stalled)")
    print(f"  → Released: {released} ({stalled_at_req} stalled)")

    print(f"\nIterations analyzed:")
    for name in iteration_names:
        stages_reached = [s[1] for s in stages if s[0] in iterations[name]]
        print(f"  {name}: {' → '.join(stages_reached)}")

if __name__ == "__main__":
    import sys
    start = sys.argv[1] if len(sys.argv) > 1 else None
    end = sys.argv[2] if len(sys.argv) > 2 else None
    generate_lifecycle_funnel(start, end)
