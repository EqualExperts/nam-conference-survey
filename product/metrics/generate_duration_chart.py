#!/usr/bin/env python3
"""Generate chart showing duration by activity type."""

import json
from datetime import datetime
from collections import defaultdict
from pathlib import Path

try:
    import plotly.graph_objects as go
    import plotly.express as px
except ImportError:
    print("Error: plotly required. Install with:")
    print("  pip install plotly kaleido")
    exit(1)

def generate_duration_chart(start_date_str=None, end_date_str=None):
    """Generate duration by activity type chart from timing log."""

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

    # Filter by date and collect durations by command
    durations = defaultdict(list)
    for a in activities:
        ts = datetime.fromisoformat(a['timestamp'].replace('Z', '+00:00')).date()

        # Apply date filter
        if start_date and ts < start_date:
            continue
        if ts > end_date:
            continue

        cmd = a['command']
        duration_mins = a['duration_seconds'] / 60  # Convert to minutes

        # Skip zero-duration entries (likely errors or instant operations)
        if duration_mins > 0:
            durations[cmd].append(duration_mins)

    # Command configuration
    command_config = {
        '/iter': {'color': '#1795d4', 'label': 'Iteration Start'},
        '/synth': {'color': '#22567c', 'label': 'Synthesis'},
        '/req': {'color': '#2c3234', 'label': 'Requirements'},
        '/rel': {'color': '#6b8e23', 'label': 'Release'},
    }

    # Prepare data for box plot
    data = []
    for cmd in sorted(durations.keys()):
        config = command_config.get(cmd, {'color': '#888888', 'label': cmd})
        for duration in durations[cmd]:
            data.append({
                'Command': config['label'],
                'Duration (minutes)': duration,
                'cmd': cmd
            })

    if not data:
        print("No duration data found (all entries have 0 duration)")
        return

    # Create box plot
    date_range = "All time" if not start_date else f"{start_date} to {end_date}"

    # Get ordered labels and colors
    ordered_cmds = [cmd for cmd in ['/iter', '/synth', '/req', '/rel'] if cmd in durations]
    labels = [command_config[cmd]['label'] for cmd in ordered_cmds]
    colors = [command_config[cmd]['color'] for cmd in ordered_cmds]

    fig = go.Figure()

    for cmd in ordered_cmds:
        config = command_config[cmd]
        fig.add_trace(go.Box(
            y=durations[cmd],
            name=config['label'],
            marker_color=config['color'],
            boxpoints='all',
            jitter=0.3,
            pointpos=-1.8,
            hovertemplate='%{y:.1f} min<extra></extra>'
        ))

    fig.update_layout(
        title=dict(
            text=f"Activity Duration by Type<br><sup>{date_range}</sup>",
            font=dict(size=18),
        ),
        yaxis_title="Duration (minutes)",
        font=dict(size=12, family="Arial"),
        height=500,
        width=800,
        showlegend=False,
    )

    # Save outputs
    output_png = script_dir / "duration_chart.png"
    output_svg = script_dir / "duration_chart.svg"
    output_html = script_dir / "duration_chart.html"

    fig.write_image(str(output_png), scale=2)
    fig.write_image(str(output_svg))
    fig.write_html(str(output_html))

    print(f"Charts saved:")
    print(f"  {output_png}")
    print(f"  {output_svg}")
    print(f"  {output_html}")
    print(f"\nSummary:")
    print(f"  Date range: {date_range}")
    print(f"\nDuration statistics (minutes):")
    for cmd in ordered_cmds:
        vals = durations[cmd]
        config = command_config[cmd]
        if vals:
            avg = sum(vals) / len(vals)
            min_val = min(vals)
            max_val = max(vals)
            print(f"  {config['label']}:")
            print(f"    Count: {len(vals)}")
            print(f"    Min: {min_val:.1f}")
            print(f"    Max: {max_val:.1f}")
            print(f"    Avg: {avg:.1f}")

if __name__ == "__main__":
    import sys
    start = sys.argv[1] if len(sys.argv) > 1 else None
    end = sys.argv[2] if len(sys.argv) > 2 else None
    generate_duration_chart(start, end)
