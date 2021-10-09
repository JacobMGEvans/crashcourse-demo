/**
 * @jest-environment jsdom
 */
import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";

test("the heading renders", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", {
      name: /testing/i,
    })
  ).toBeInTheDocument();
});

test("the increment button increases value by one", async () => {
  render(<Home />);

  const button = screen.getByRole("button", {
    name: /increment/i,
  });

  expect(button).toBeInTheDocument();

  userEvent.click(button);

  expect(await screen.findByRole("status")).toHaveValue("1");
});

test("the decrement button descreases value by one", async () => {
  render(<Home />);

  const button = screen.getByRole("button", {
    name: /decrement/i,
  });

  expect(button).toBeInTheDocument();

  userEvent.click(button);

  expect(await screen.findByRole("status")).toHaveValue("-1");
});

test("the reset button sets value to 0", async () => {
  render(<Home />);

  const button = screen.getByRole("button", {
    name: /reset/i,
  });

  expect(button).toBeInTheDocument();

  userEvent.click(button);

  expect(await screen.findByRole("status")).toHaveValue("0");
});

test("async button click renders element", async () => {
  render(<Home />);
  screen.getByRole("heading", { name: /Async Button Load/i });

  userEvent.click(
    screen.getByRole("button", {
      name: /async load/i,
    })
  );

  expect(
    await screen.findByText(/hello world/i, {}, { timeout: 1500 })
  ).toBeInTheDocument();
});

test("async button click removes element", async () => {
  render(<Home />);
  screen.getByRole("heading", { name: /Async Button Load/i });
  const asyncButton = screen.getByRole("button", { name: /async load/i });

  userEvent.click(asyncButton);

  expect(
    await screen.findByText(/hello world/i, {}, { timeout: 1500 })
  ).toBeInTheDocument();

  userEvent.click(asyncButton);

  await waitForElementToBeRemoved(() => screen.queryByText(/hello world/i), {
    timeout: 1500,
  });
});

test("current time clock updates w/ fake timer", async () => {
  jest.useFakeTimers();
  render(<Home />);
  const dateTime = new Date();
  const firstTime = dateTime.toLocaleTimeString();

  expect(await screen.findByText(new RegExp(firstTime))).toBeInTheDocument();

  const secondTime = `${dateTime.getMinutes()}:${(
    dateTime.getSeconds() + 1
  ).toLocaleString()}`;
  expect(
    await screen.findByText(new RegExp(secondTime), {}, { timeout: 1001 })
  ).toBeInTheDocument();
  expect(screen.queryByText(new RegExp(firstTime))).not.toBeInTheDocument();

  jest.useRealTimers();
});
