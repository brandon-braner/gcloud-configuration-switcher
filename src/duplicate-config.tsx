import { ActionPanel, Action, Form, showToast, Toast, popToRoot } from "@raycast/api";
import { useState, useEffect } from "react";
import { runGCloudCommand } from "./utils";

interface GCloudConfig {
  name: string;
  account?: string;
  project?: string;
  region?: string;
}

function parseGCloudConfigs(output: string): GCloudConfig[] {
  const lines = output.trim().split("\n");
  const configs: GCloudConfig[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(/\s+/);
    if (parts.length >= 2) {
      configs.push({
        name: parts[0],
        account: parts[2] || undefined,
        project: parts[3] || undefined,
        region: parts[4] || undefined,
      });
    }
  }

  return configs;
}

function getConfigProperties(configName: string): { project?: string; account?: string; region?: string } {
  try {
    const output = runGCloudCommand(`gcloud config configurations describe ${configName}`);
    const lines = output.split("\n");
    const properties: { project?: string; account?: string; region?: string } = {};

    for (const line of lines) {
      if (line.includes("project:")) {
        properties.project = line.split(":")[1]?.trim();
      } else if (line.includes("account:")) {
        properties.account = line.split(":")[1]?.trim();
      } else if (line.includes("region:")) {
        properties.region = line.split(":")[1]?.trim();
      }
    }

    return properties;
  } catch (error) {
    return {};
  }
}

export default function Command() {
  const [configs, setConfigs] = useState<GCloudConfig[]>([]);
  const [nameError, setNameError] = useState<string | undefined>();
  const [selectedConfig, setSelectedConfig] = useState<string>("");

  useEffect(() => {
    try {
      const output = runGCloudCommand("gcloud config configurations list");
      const parsedConfigs = parseGCloudConfigs(output);
      setConfigs(parsedConfigs);
    } catch (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to load configurations",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }, []);

  async function handleSubmit(values: { sourceConfig: string; newName: string }) {
    if (!values.newName) {
      setNameError("New configuration name is required");
      return;
    }

    if (!values.sourceConfig) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Source configuration required",
        message: "Please select a configuration to duplicate",
      });
      return;
    }

    try {
      // Get properties from source configuration
      const properties = getConfigProperties(values.sourceConfig);

      // Create new configuration
      runGCloudCommand(`gcloud config configurations create ${values.newName}`);

      // Copy properties to new configuration
      if (properties.project) {
        runGCloudCommand(`gcloud config set project ${properties.project} --configuration=${values.newName}`);
      }

      if (properties.account) {
        runGCloudCommand(`gcloud config set account ${properties.account} --configuration=${values.newName}`);
      }

      if (properties.region) {
        runGCloudCommand(`gcloud config set compute/region ${properties.region} --configuration=${values.newName}`);
      }

      await showToast({
        style: Toast.Style.Success,
        title: "Configuration duplicated",
        message: `Created ${values.newName} from ${values.sourceConfig}`,
      });

      popToRoot();
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to duplicate configuration",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  function dropNameErrorIfNeeded() {
    if (nameError && nameError.length > 0) {
      setNameError(undefined);
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Duplicate Configuration" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="sourceConfig"
        title="Source Configuration"
        value={selectedConfig}
        onChange={setSelectedConfig}
      >
        {configs.map((config) => (
          <Form.Dropdown.Item key={config.name} value={config.name} title={config.name} />
        ))}
      </Form.Dropdown>
      <Form.TextField
        id="newName"
        title="New Configuration Name"
        placeholder="my-config-copy"
        error={nameError}
        onChange={dropNameErrorIfNeeded}
        onBlur={(event) => {
          if (event.target.value?.length == 0) {
            setNameError("New configuration name is required");
          } else {
            dropNameErrorIfNeeded();
          }
        }}
      />
    </Form>
  );
}
