import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";

/*
  Amplify Gen 2 backend. Amplify Hosting deploys this automatically
  from the main branch in week 3. Nothing here needs to change for v1.
*/
defineBackend({
  data,
});
