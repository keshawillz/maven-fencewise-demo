import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*
  The one table every product in the cohort starts with: signups.
  Anyone can CREATE a signup from the public site (that is what the form does).
  Nobody can read them from the site. You read them in the Amplify console
  under Data manager, which keeps your users' email addresses off the public internet.
*/
const schema = a.schema({
  Signup: a
    .model({
      email: a.string().required(),
      name: a.string(),
      note: a.string(),
      source: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey().to(["create"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});
