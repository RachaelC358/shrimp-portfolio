import { defineStorage } from '@aws-amplify/backend';
import { GlobalVariables } from 'aws-cdk-lib/aws-codepipeline';

export const storage = defineStorage({
  name: 'shrimpStoredFiles',
  access: (allow) => ({
    'file-submissions/*': [
      allow.authenticated.to(['read','write']),
    ],
  })
});


