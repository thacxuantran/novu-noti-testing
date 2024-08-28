import { workflow } from "@novu/framework";
import { renderEmail } from "../../emails/novu-onboarding-email";
import { emailControlSchema, payloadSchema } from "./schemas";

export const welcomeOnboardingEmail = workflow(
  "welcome-onboarding-email",
  async ({ step, payload }) => {
    await step.email(
      "send-email",
      async (controls) => {
        return {
          subject: controls.subject,
          body: renderEmail(controls, payload),
        };
      },
      {
        controlSchema: emailControlSchema,
      }
    );
  },
  {
    payloadSchema,
  }
);

export const inAppNotification = workflow(
  "in-app-notification",
  async ({ step, payload }) => {
    await step.inApp("inbox", async () => {
      return {
        subject: "Welcome to Acme!",
        body: "We are excited to have you on board.",
        avatar: "https://acme.com/avatar.png",
        primaryAction: {
          label: "Get Started",
          url: "https://acme.com/get-started",
        },
        secondaryAction: {
          label: "Learn More",
          url: "https://acme.com/learn-more",
        },
      };
    });
  },
  {
    payloadSchema,
  }
);
