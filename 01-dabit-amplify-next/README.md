# My Dabit next.js-amplify-workshop Build

<pre>
$ npx create-next-app dabit-amplify-next
Need to install the following packages:
  create-next-app@13.1.4
Ok to proceed? (y) 
✔ Would you like to use TypeScript with this project? … No / Yes
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
✔ Would you like to use experimental `app/` directory with this project? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /home/cskim/git-repo/AWS-App-dev/dabit-amplify-next.

$ yarn add aws-amplify @aws-amplify/ui-react@1.2.25 react-simplemde-editor@4.1.5 react-markdown uuid
$ yarn add -D tailwindcss postcss autoprefixer @tailwindcss/typography

$ npx tailwindcss init -p

$ amplify init
? Enter a name for the project dabitamplifynext
...

? Initialize the project with the above configuration? No
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  <b>.</b>
? Distribution Directory Path: <b>.next</b>
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile

? Please choose the profile you want to use my-aws-profile
Adding backend environment dev to AWS Amplify app: d1q2dgofh....

✔ Help improve Amplify CLI by sharing non sensitive configurations on failures (y/N) · no
Deployment state saved successfully.
✔ Initialized provider successfully.
✅ Initialized your environment successfully.

$ amplify add api
? Select from one of the below mentioned services: GraphQL
? Here is the GraphQL API that we will create. Select a setting to edit or continue Name: dabitamplifynext
? Provide API name: DabitNextBlogAPI
? Here is the GraphQL API that we will create. Select a setting to edit or continue Authorization modes: API key (default, expiration time: 7 days from now)


? Choose the default authorization type for the API API key
✔ Enter a description for the API key: · public
✔ After how many days from now the API key should expire (1-365): · 365
? Configure additional auth types? No
? Here is the GraphQL API that we will create. Select a setting to edit or continue Continue
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)

✅ GraphQL schema compiled successfully.

Edit your schema at /home/cskim/git-repo/AWS-App-dev/dabit-amplify-next/amplify/backend/api/NextBlog/schema.graphql or place .graphql files in a directory at /home/cskim/git-repo/AWS-App-dev/dabit-amplify-next/amplify/backend/api/NextBlog/schema
✔ Do you want to edit the schema now? (Y/n) · yes
Edit the file in your editor: /home/cskim/git-repo/AWS-App-dev/dabit-amplify-next/amplify/backend/api/NextBlog/schema.graphql
<b>
type Post @model @auth(rules: [{ allow: public }]) {
  id: ID!
  title: String!
  content: String!
}
</b>
✅ Successfully added resource NextBlog locally

$ amplify push
...
⠇ Building resource api/NextBlog
✅ GraphQL schema compiled successfully.

Edit your schema at /home/cskim/git-repo/AWS-App-dev/dabit-amplify-next/amplify/backend/api/NextBlog/schema.graphql or place .graphql files in a directory at /home/cskim/git-repo/AWS-App-dev/dabit-amplify-next/amplify/backend/api/NextBlog/schema
✔ Successfully pulled backend environment dev from the cloud.
⠧ Building resource api/NextBlog
...
    Current Environment: dev
    
┌──────────┬───────────────┬───────────┬───────────────────┐
│ Category │ Resource name │ Operation │ Provider plugin   │
├──────────┼───────────────┼───────────┼───────────────────┤
│ Api      │ NextBlog      │ Create    │ awscloudformation │
└──────────┴───────────────┴───────────┴───────────────────┘
? Are you sure you want to continue? Yes
...
✅ GraphQL schema compiled successfully.

Edit your schema at /home/cskim/git-repo/AWS-App-dev/dabit-amplify-next/amplify/backend/api/NextBlog/schema.graphql or place .graphql files in a directory at /home/cskim/git-repo/AWS-App-dev/dabit-amplify-next/amplify/backend/api/NextBlog/schema
? Do you want to generate code for your newly created GraphQL API Yes
? Choose the code generation language target javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions <b>./graphql/**/*.js</b>
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2 

✔ Generated GraphQL operations successfully and saved at graphql
...
GraphQL transformer version: 2
</pre>

<pre>
AWS AppSync --> NextBlog-dev --> Queries

mutation MyMutation {
  createPost(input: {
    title: "My first post"
    content: "Hello world!"
  }) {
    id
    title
    content
  }
}
====
{
  "data": {
    "createPost": {
      "id": "6541ad8b-40d1-4ac7-8adb-8035c8c9cd40",
      "title": "My first post",
      "content": "Hello world!"
    }
  }
}
</pre>

<pre>

yarn dev

</pre>
