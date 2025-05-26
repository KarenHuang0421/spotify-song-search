
# SpotifySongSearch


### Spotify 開發者帳號

https://developer.spotify.com/dashboard/

### Genius API

https://genius.com/api-clients

### OpenAI 開發者平台

https://platform.openai.com/


### 環境變數

https://dashboard.doppler.com/


## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/236HNlfHW3)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve spotify-song-search

npx nx serve spotify-song-search-express
```

To create a production bundle:

```sh
npx nx build spotify-song-search
```

To see all available targets to run for a project, run:

```sh
npx nx show project spotify-song-search
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/vue:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/vue:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 開發日誌

2025/5/12-
建立新的spotify開發帳號，因website設定限制(需為https...etc)，故啟動專案之後可能會需要使用ngrok ` ngrok http 4200`，並修改spotify後台與vite.config設置；但依然沒有成功呼叫需使用者權限的api(會得到401 Valid user authentication required')，下次可試試官方的授權程式碼範例
https://github.com/spotify/web-api-examples


