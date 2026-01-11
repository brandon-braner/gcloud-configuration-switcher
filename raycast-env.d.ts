/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `list-configs` command */
  export type ListConfigs = ExtensionPreferences & {}
  /** Preferences accessible in the `create-config` command */
  export type CreateConfig = ExtensionPreferences & {}
  /** Preferences accessible in the `duplicate-config` command */
  export type DuplicateConfig = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `list-configs` command */
  export type ListConfigs = {}
  /** Arguments passed to the `create-config` command */
  export type CreateConfig = {}
  /** Arguments passed to the `duplicate-config` command */
  export type DuplicateConfig = {}
}

