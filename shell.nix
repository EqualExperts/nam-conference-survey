{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "nam-conference-survey-dev";

  buildInputs = with pkgs; [
    # Package managers
    pnpm
    nodejs_20

    # Container orchestration
    docker-compose

    # Build tools
    cmake

    # Useful for native dependencies
    python3
    gcc
    gnumake

    # Database client (optional, for debugging)
    postgresql_15

    # Shell
    zsh
  ];

  shellHook = ''
    echo "🚀 NAM Conference Survey Development Environment"
    echo ""
    echo "Available commands:"
    echo "  pnpm run dev       - Start all services"
    echo "  pnpm run dev:bg    - Start in background"
    echo "  pnpm run logs      - View logs"
    echo "  pnpm run stop      - Stop containers"
    echo "  pnpm run clean     - Stop and delete all data"
    echo ""
    echo "Node version: $(node --version)"
    echo "pnpm version: $(pnpm --version)"
    echo ""

    # Launch zsh if available
    if command -v zsh &> /dev/null; then
      exec zsh
    fi
  '';

  # Set environment variables
  DOCKER_BUILDKIT = "1";
  COMPOSE_DOCKER_CLI_BUILD = "1";
}
