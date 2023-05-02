# 🤖🖥️ GPT Terminal Plugin
#### ChatGPT Universal Terminal / Command Line Plugin

Use ChatGPT as a terminal to get things done for you, connecting with your computer. You can state what you want in natural language, like "translate file somefile.txt in documents folder from english to french" or "create a pet-store website in my xyz folder" and the plugin will accomplish tasks for you.


First of all, you need ChatGPT plugin/developer access to try this as this is a plugin for ChatGPT. If you do not already have plugin developer access, please [join the waitlist](https://openai.com/waitlist/plugins).

You can read the [plugin documentation from OpenAI](https://platform.openai.com/docs/plugins/).

If you are looking for a boilerplate to build plugins in NodeJs, try my ChatGPT NodeJS boilerplate [here](https://github.com/etherlegend/chatgpt-plugin-node-todo). 

The plugin can modify files in your file system, so use this responsibly :)

## What you can do with it

Pretty much anything, and more!! 

- Work with files
- Create projects
- Write stories and books
- Automate common command workflows

Don't try formatting your file system, be a bit cautious! 

Try translating content between files, summarising text etc etc..

## Getting Started

First of all, you need ChatGPT plugin/developer access to try this as this is a plugin for ChatGPT. If you do not already have plugin developer access, please [join the waitlist](https://openai.com/waitlist/plugins). Once you've access to the ChatGPT plugins, you can set this up locally to try it out.

1. Clone the repository

```
git clone https://github.com/etherlegend/gpt-terminal-plugin.git
```

2. Navigate to the project directory

```
cd gpt-terminal-plugin
```

3. Install the required dependencies

```
npm install
```

4. Start the server

```
npm start
```

The server will now be running on `http://localhost:5004`.


Once the local server is running:

1. Navigate to https://chat.openai.com.
2. In the Model drop down, select "Plugins" (note, if you do not see it there, you do not have access yet).
3. Select "Plugin store"
4. Select "Develop your own plugin"
5. Enter in localhost:5004 since this is the URL the server is running on locally, then select "Find manifest file".

The plugin should now be installed and enabled! You can start with a question like "What is on my todo list" and then try adding something to it as well!



You can read the [plugin documentation from OpenAI](https://platform.openai.com/docs/plugins/).

If you are looking for a boilerplate to build plugins in NodeJs, try my ChatGPT NodeJS boilerplate [here](https://github.com/etherlegend/chatgpt-plugin-node-todo). 

### Endpoints

- `GET /system/os-version`: Returns the OS version
- `GET /system/local-time`: Returns the local time
- `GET /system/current-folder`: Returns the current folder
- `POST /system/command`: Runs a command and returns the output

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

