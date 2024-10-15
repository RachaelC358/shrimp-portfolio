import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'shrimpStoredFiles',
  access: (allow) => ({
    'file-submissions/*': [
      allow.authenticated.to(['read','write']),
    ],
  })
});