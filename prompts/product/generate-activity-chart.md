# Generate PM Activity Chart

Generate a visualization showing product management activity frequency over time from the timing log.

## Required Input
- **Start Date**: Date to begin chart (default: November 1st of current period)
- **End Date**: Date to end chart (default: today)

## Context Files to Review
- `product/metrics/timing-log.jsonl` - JSONL file with activity timestamps and commands

## Timing Log Format

Each line is a JSON object with:
```json
{
  "timestamp": "2025-11-13T14:53:05Z",
  "command": "/synth",
  "iteration": "2025-11-12-mvp",
  "start": "...",
  "end": "...",
  "duration_seconds": 212,
  "status": "success",
  "metadata": {}
}
```

## Command Types

| Command | Label | Color (EE Brand) |
|---------|-------|------------------|
| `/iter` | Iteration Start | #1795d4 (Primary Blue) |
| `/synth` | Synthesis | #22567c (Navy) |
| `/req` | Requirements | #2c3234 (Charcoal) |
| `/rel` | Release | #6b8e23 (Olive) |

## Instructions

1. Parse the timing log JSONL file
2. Filter activities to the specified date range
3. Group activities by date and command type
4. Generate a stacked bar chart with:
   - X-axis: Dates (daily frequency)
   - Y-axis: Number of activities
   - Stacked bars colored by command type
   - Legend showing command labels
   - Summary statistics (total activities, active days)

## Chart Requirements

- **Title**: "Product Management Activities by Day"
- **Subtitle**: Date range covered
- **Dimensions**: 14x6 inches at 150 DPI
- **Date formatting**: "Mon DD" on x-axis, weekly major ticks
- **Grid**: Light horizontal gridlines only
- **Summary box**: Total activities and active days count

## Python Script

```python
#!/usr/bin/env python3
"""Generate a chart showing PM activity frequency by day and command type."""

import json
from datetime import datetime, timedelta
from collections import defaultdict
from pathlib import Path

# Check for matplotlib
try:
    import matplotlib.pyplot as plt
    import matplotlib.dates as mdates
    import numpy as np
except ImportError:
    print("Error: matplotlib and numpy required. Install with:")
    print("  pip install matplotlib numpy")
    exit(1)

def generate_activity_chart(start_date_str=None, end_date_str=None):
    """Generate activity chart from timing log."""

    # Determine paths
    script_dir = Path(__file__).parent
    timing_log = script_dir / "timing-log.jsonl"

    # Parse dates
    end_date = datetime.now().date() if not end_date_str else datetime.strptime(end_date_str, "%Y-%m-%d").date()
    start_date = datetime(end_date.year, 11, 1).date() if not start_date_str else datetime.strptime(start_date_str, "%Y-%m-%d").date()

    # Read timing log
    activities = []
    with open(timing_log, 'r') as f:
        for line in f:
            line = line.strip()
            if line:
                activities.append(json.loads(line))

    # Filter and group
    daily_counts = defaultdict(lambda: defaultdict(int))
    all_commands = set()

    for a in activities:
        ts = datetime.fromisoformat(a['timestamp'].replace('Z', '+00:00'))
        activity_date = ts.date()
        if start_date <= activity_date <= end_date:
            daily_counts[activity_date][a['command']] += 1
            all_commands.add(a['command'])

    # Create date range
    all_dates = []
    current = start_date
    while current <= end_date:
        all_dates.append(current)
        current += timedelta(days=1)

    # Command configuration
    command_config = {
        '/iter': {'color': '#1795d4', 'label': 'Iteration Start'},
        '/synth': {'color': '#22567c', 'label': 'Synthesis'},
        '/req': {'color': '#2c3234', 'label': 'Requirements'},
        '/rel': {'color': '#6b8e23', 'label': 'Release'},
    }

    # Prepare data
    commands = sorted(all_commands)
    data = {cmd: [daily_counts[date].get(cmd, 0) for date in all_dates] for cmd in commands}

    # Create chart
    fig, ax = plt.subplots(figsize=(14, 6))

    # Stacked bars
    bottom = np.zeros(len(all_dates))
    for cmd in commands:
        config = command_config.get(cmd, {'color': '#888888', 'label': cmd})
        values = np.array(data[cmd])
        ax.bar(all_dates, values, bottom=bottom, label=config['label'],
               color=config['color'], width=0.8, edgecolor='white', linewidth=0.5)
        bottom += values

    # Formatting
    ax.set_xlabel('Date', fontsize=11)
    ax.set_ylabel('Number of Activities', fontsize=11)
    ax.set_title(f'Product Management Activities by Day\n({start_date.strftime("%B %Y")} - {end_date.strftime("%B %Y")})',
                 fontsize=14, fontweight='bold')

    ax.xaxis.set_major_locator(mdates.WeekdayLocator(byweekday=mdates.MO))
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %d'))
    ax.xaxis.set_minor_locator(mdates.DayLocator())
    plt.xticks(rotation=45, ha='right')

    ax.yaxis.set_major_locator(plt.MaxNLocator(integer=True))
    ax.set_ylim(0, max(bottom) + 1 if max(bottom) > 0 else 1)

    ax.grid(axis='y', alpha=0.3, linestyle='--')
    ax.set_axisbelow(True)
    ax.legend(loc='upper left', framealpha=0.9)

    # Summary stats
    total_activities = sum(sum(data[cmd]) for cmd in commands)
    active_days = len([d for d in all_dates if sum(daily_counts[d].values()) > 0])
    ax.text(0.98, 0.95, f'Total Activities: {total_activities}\nActive Days: {active_days}',
            transform=ax.transAxes, fontsize=10, verticalalignment='top',
            horizontalalignment='right', bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

    plt.tight_layout()

    # Save outputs
    output_png = script_dir / "activity_chart.png"
    output_svg = script_dir / "activity_chart.svg"
    plt.savefig(output_png, dpi=150, bbox_inches='tight')
    plt.savefig(output_svg, bbox_inches='tight')

    print(f"Charts saved:")
    print(f"  {output_png}")
    print(f"  {output_svg}")
    print(f"\nSummary:")
    print(f"  Date range: {start_date} to {end_date}")
    print(f"  Total activities: {total_activities}")
    print(f"  Active days: {active_days}")
    print(f"\nBy command:")
    for cmd in commands:
        print(f"  {cmd}: {sum(data[cmd])}")

if __name__ == "__main__":
    import sys
    start = sys.argv[1] if len(sys.argv) > 1 else None
    end = sys.argv[2] if len(sys.argv) > 2 else None
    generate_activity_chart(start, end)
```

## Output Location

Save generated charts to: `product/metrics/`
- `activity_chart.png` - PNG format at 150 DPI
- `activity_chart.svg` - Vector format for scaling

## Usage

Run the script from the metrics directory:
```bash
cd product/metrics
python generate_activity_chart.py                    # Default: Nov 1 to today
python generate_activity_chart.py 2025-11-01         # Custom start date
python generate_activity_chart.py 2025-11-01 2025-12-31  # Custom date range
```

Or have Claude generate the chart directly by reading the timing log and producing the visualization.

## Success Criteria

- [ ] Chart displays all command types present in the data
- [ ] Date range is clearly labeled
- [ ] Colors follow Equal Experts brand guidelines where applicable
- [ ] Summary statistics are accurate
- [ ] Both PNG and SVG outputs are generated
