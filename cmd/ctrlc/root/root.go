package root

import (
	"github.com/MakeNowJust/heredoc/v2"
	"github.com/spf13/cobra"

	"github.com/ctrlplanedev/ctrlconnect/cmd/ctrlc/root/agent"
)

func NewRootCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "ctrlc <command> <subcommand> [flags]",
		Short: "Ctrlconnect CLI",
		Long:  `Configure and manage your deployment environments remotely.`,
		Example: heredoc.Doc(`
			$ ctrlc agent run
			$ ctrlc connect <agent-name>
		`),
		RunE: func(cmd *cobra.Command, args []string) error {
			return cmd.Help()
		},
	}

	cmd.AddCommand(agent.NewAgentCmd())

	return cmd
}
