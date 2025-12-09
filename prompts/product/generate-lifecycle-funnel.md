# Generate Iteration Lifecycle Funnel

Generate a funnel visualization showing how many iterations progress through each PM workflow stage.

## Purpose

Expose drop-off points in the PM workflow. If many iterations have `/iter` and `/synth` but no `/req`, that suggests requirements extraction is a blocker.

## Required Input
- **Start Date**: Date to begin analysis (default: all time)
- **End Date**: Date to end analysis (default: today)

## Context Files to Review
- `product/metrics/timing-log.jsonl` - JSONL file with activity timestamps and commands

## Workflow Stages

The PM workflow has 4 stages in order:

| Stage | Command | Description |
|-------|---------|-------------|
| 1. Started | `/iter` | Iteration kicked off |
| 2. Synthesized | `/synth` | Discovery research synthesized |
| 3. Requirements | `/req` | User stories extracted |
| 4. Released | `/rel` | Work shipped to production |

An iteration "reached" a stage if there's at least one command of that type with matching iteration name.

## Data Analysis

1. Parse timing log and group by iteration name
2. For each iteration, determine which stages were reached
3. Count iterations at each stage
4. Note: `/rel` commands may have `iteration: null` - these are ad-hoc releases not tied to a specific iteration

## Chart Requirements

- **Type**: Horizontal funnel or stacked horizontal bar
- **Title**: "Iteration Lifecycle Funnel"
- **Subtitle**: Date range and total iterations analyzed
- **Colors**: Use EE brand colors in gradient (darkest at top)
- **Labels**: Show count and percentage at each stage
- **Dimensions**: 10x6 inches at 150 DPI

## Python Script

```python
#!/usr/bin/env python3
"""Generate iteration lifecycle funnel showing progression through PM stages."""

import json
from datetime import datetime
from collections import defaultdict
from pathlib import Path

try:
    import matplotlib.pyplot as plt
    import matplotlib.patches as mpatches
    import numpy as np
except ImportError:
    print("Error: matplotlib and numpy required. Install with:")
    print("  pip install matplotlib numpy")
    exit(1)

def generate_lifecycle_funnel(start_date_str=None, end_date_str=None):
    """Generate lifecycle funnel from timing log."""

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
    stage_counts = []
    for cmd, label in stages:
        count = sum(1 for cmds in iterations.values() if cmd in cmds)
        stage_counts.append((label, count))

    total_iterations = len(iterations)

    # Create funnel chart
    fig, ax = plt.subplots(figsize=(10, 6))

    # Colors - EE brand gradient
    colors = ['#1795d4', '#22567c', '#2c3234', '#6b8e23']

    # Funnel dimensions
    max_width = 0.8
    bar_height = 0.6
    y_positions = list(range(len(stages) - 1, -1, -1))  # Reverse so Started is at top

    # Draw funnel bars
    for i, ((label, count), y, color) in enumerate(zip(stage_counts, y_positions, colors)):
        # Width proportional to count (relative to max stage count)
        if total_iterations > 0:
            width = max_width * (count / total_iterations) if total_iterations > 0 else 0
        else:
            width = 0

        # Center the bar
        left = (max_width - width) / 2

        # Draw bar
        bar = ax.barh(y, width, height=bar_height, left=left, color=color,
                      edgecolor='white', linewidth=2)

        # Add label with count and percentage
        pct = (count / total_iterations * 100) if total_iterations > 0 else 0
        label_text = f"{label}: {count}"
        if i > 0:  # Show percentage for all stages after first
            label_text += f" ({pct:.0f}%)"

        # Position label
        ax.text(max_width / 2, y, label_text, ha='center', va='center',
                fontsize=12, fontweight='bold', color='white' if count > 0 else 'gray')

    # Formatting
    ax.set_xlim(0, max_width)
    ax.set_ylim(-0.5, len(stages) - 0.5)
    ax.set_aspect('equal')
    ax.axis('off')

    # Title
    date_range = f"All time" if not start_date else f"{start_date} to {end_date}"
    ax.set_title(f'Iteration Lifecycle Funnel\n{total_iterations} iterations analyzed ({date_range})',
                 fontsize=14, fontweight='bold', pad=20)

    # Add iteration list below chart
    iteration_names = sorted(iterations.keys())
    if iteration_names:
        iter_text = "Iterations: " + ", ".join(iteration_names)
        if len(iter_text) > 100:
            iter_text = iter_text[:97] + "..."
        fig.text(0.5, 0.02, iter_text, ha='center', fontsize=8, color='gray')

    plt.tight_layout()

    # Save outputs
    output_png = script_dir / "lifecycle_funnel.png"
    output_svg = script_dir / "lifecycle_funnel.svg"
    plt.savefig(output_png, dpi=150, bbox_inches='tight')
    plt.savefig(output_svg, bbox_inches='tight')

    print(f"Charts saved:")
    print(f"  {output_png}")
    print(f"  {output_svg}")
    print(f"\nSummary:")
    print(f"  Total iterations: {total_iterations}")
    print(f"  Date range: {date_range}")
    print(f"\nFunnel:")
    for label, count in stage_counts:
        pct = (count / total_iterations * 100) if total_iterations > 0 else 0
        print(f"  {label}: {count} ({pct:.0f}%)")

    print(f"\nIterations analyzed:")
    for name in iteration_names:
        stages_reached = [s[1] for s in stages if s[0] in iterations[name]]
        print(f"  {name}: {' → '.join(stages_reached)}")

if __name__ == "__main__":
    import sys
    start = sys.argv[1] if len(sys.argv) > 1 else None
    end = sys.argv[2] if len(sys.argv) > 2 else None
    generate_lifecycle_funnel(start, end)
```

## Output Location

Save generated charts to: `product/metrics/`
- `lifecycle_funnel.png` - PNG format at 150 DPI
- `lifecycle_funnel.svg` - Vector format for scaling

## Usage

```bash
cd product/metrics
python generate_lifecycle_funnel.py                    # All time
python generate_lifecycle_funnel.py 2025-11-01         # From start date
python generate_lifecycle_funnel.py 2025-11-01 2025-12-31  # Custom range
```

## Success Criteria

- [ ] Funnel shows all 4 stages in correct order
- [ ] Counts are accurate per iteration
- [ ] Percentages calculated relative to total iterations
- [ ] Iterations with null iteration field are excluded
- [ ] Chart clearly shows drop-off points
