package run

import (
	"github.com/spf13/cobra"
)

func NewAgentRunCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "run",
		Short: "Run the agent",
		Long:  `Run the agent to establish connection with the control plane.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			return nil
		},
	}

	return cmd
}
