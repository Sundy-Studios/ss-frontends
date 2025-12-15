import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import EmptyState from ".";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  argTypes: {
    message: { control: "text" }, // Allows changing the message in Storybook controls
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

// Default story
export const Default: Story = {
  args: {},
};

// Custom message story
export const CustomMessage: Story = {
  args: {
    message: "No results found for your search",
  },
};
