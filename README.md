# Chevron [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE.md) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

<p align=center>
  <img width="80%" src="https://i.imgur.com/Wa7HcuW.png">
</p>

<p align=center>
  Сhevron is a <i>powerful</i> and highly <i>functional</i> startpage integrated with chatGPT<br/> and hidden under the super <i>minimalistic</i> and <i>animated</i> design
</p>

<p align=center>
  available in <i>static</i>, <i>hosted</i> and <i>github pages</i> options
</p>

<p align=center>
  <font size=4>
    <a href="https://kholmogorov27.github.io/chevron/">Live Demo</a> | 
    <a href="https://github.com/kholmogorov27/chevron/releases/latest">Download</a> |
    <a href="#installation">Installation</a>
  </font>
</p>

## Content

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
  <font size=2>
  - [Static _<sup>(recommended)</sup>_](#static-recommended)
  - [Hosted](#hosted)
  - [GitHub Pages](#github-pages)
    </font>
- [Usage](#usage)
  <font size=2>
  - [Macros and commands](#macros-and-commands)
  - [Macros menu](#macros-menu)
  - [Hotkeys](#hotkeys)
  - [ChatGPT](#chatgpt)
    </font>
- [Configuration](#configuration)
  <font size=2>
  - [Settings](#settings)
  - [config.js](#configjs)
    </font>
- [TODO](#todo)
- [Technologies](#technologies)

## Features

autosuggestions, history, macros and commands, macros menu, hotkeys, chatGPT integration, currency converter, calculator, animated and minimalist design

## Screenshots

<table>
  <tbody>
    <tr>
      <td colspan=2>
        <img width="100%" src="https://thumbs.gfycat.com/SizzlingAcrobaticArmadillo.webp"/>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://i.imgur.com/7j0f88w.png"/>
      </td>
      <td>
        <img src="https://i.imgur.com/eaBEk6m.png"/>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://i.imgur.com/0bNz1vL.png"/>
      </td>
      <td>
        <img src="https://i.imgur.com/TSY3T6k.png"/>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWZmMTY3YmI1YzkxMDMyNDhmZmFhMTAzZTc2MTcwZWM1NDZiNGJiZSZjdD1n/libdVLG7NrsRv9LYAJ/giphy.gif"/>
      </td>
      <td>
        <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzc3ZDI3NTczNWMyMzcyMjUxMmEzNmVhNGIzMTcwYmYyNDZhOTk2MCZjdD1n/P6sYvkQHOpjVTGhZHv/giphy.gif"/>
      </td>
    </tr>
    <tr>
      <td colspan=2 align=center>
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2YyOTI3Yzg3NWU2MzhkZjBjZWVjN2EzMTY2YzNlNGIzZDQzNmVkZiZjdD1n/FoIvawvfxuoQ2IMZ8H/giphy.gif"/>
      </td>
    </tr>
  </tbody>
</table>

## Installation

You can set Chevron as the homepage (in the browser settings) or the new tab (you will need a custom tab extension).

<a id="focus-problem"></a>

> **Warning**
> If you want the app itself to be focused when opening a new tab and not the address bar,  
> I recommend [this](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna) extension in tandem with the [hosted](#hosted) or [github pages](#github-pages) installation method for all chromium based browsers (_Google Chrome, Microsoft Edge, Brave, Opera, Vivaldi etc_)

There are a few ways to install Chevron:

### Static _<sup>(recommended)</sup>_

> This method is **recommended** because it doesn't depend on your internet connection or any remote servers, and the UI will be loaded instantly.  
> Some browser and extensions might have [the focus problem](#focus-problem)

1. Download [the latest release](https://github.com/kholmogorov27/chevron/releases/latest)
1. Unzip the archive in any convenient place

### Hosted

> This method is useful when you want to fix [the focus problem](#focus-problem) or for any other reason the _Local file_ method doesn't work for you

> **Note**
> This method assumes that you have [Node.js and npm](https://nodejs.org/en/download/) installed on your PC

1. Clone this repository
1. [Build](#build)
1. Install node-(_windows/linux/mac_)

   _for Windows:_

   ```bash
   npm install -g node-windows && npm link node-windows
   ```

   _for Linux:_

   ```bash
   npm install -g node-linux && npm link node-linux
   ```

   _for Mac:_

   ```bash
   npm install -g node-mac && npm link node-mac
   ```

1. Register the local server as a system service

   > **Note**
   > Administrator privileges are required to run this command

   _for Windows:_

   ```bash
   npm run register_windows
   ```

   _for Linux:_

   ```bash
   npm run register_linux
   ```

   _for Mac:_

   ```bash
   npm run register_mac
   ```

   This operation will create a service in your system to run the server on startup.

   To uninstall the service, run the command again.

After you register the server, you will be able to access Chevron on **_localhost:8000_**

### GitHub Pages

> This method **isn't recommended** because it depends on your internet connection and GitHub servers

1. Fork this repository
1. Go `Settings` &rarr; `Pages` &rarr; <code>Branch: <i>"gh-pages"</i></code> &rarr; `Save`
1. Wait until your link will appear

## Build

> **Note** > [Node.js and npm](https://nodejs.org/en/download/) are required

1. Install dependencies

   ```bash
   npm install
   ```

1. Build

   ```bash
   npm run build
   ```

After building, you can find all the necessary files in the `/dist` folder

## Usage

To use Chevron's main functionality, just type something (you don't need to worry about focus on the input field, it is always in focus at the right moment).

As soon as you type something, the query will be parsed and suggestions will be given.

Suggestions generates from history and autosuggestion engine. You can limit number of suggestions for each source is settings.

By default, you will be redirected to the search page of the search engine, however if the query matches a trigger of a macro, redirecting to this query will take you to the URL, specified in macro properties (`url` property).

- #### **Macros and commands**:<br/>

  _<span style="color: orange">Macro</span>_ is something like a bookmark. It helps access your frequently visited websites.<br/>
  To use a macro, your query must match one of its triggers.
  <pre><span style="color: grey">></span> <span style="color: orange">gh</span></pre>

  _<span style="color: limegreen">Command</span>_ is an addition to macros. With commands you can implement some website logic by modifying the URL.<br/>
  To use a command, you need to put the command after a trigger of a macro (the command must be defined in the global and macro commands lists). Everything going after a command is _<span style="color: steelblue">argument</span>_.
  <pre><span style="color: grey">></span> <span style="color: orange">so</span><span style="color: limegreen">?</span><span style="color: steelblue">how to parse html with regex</span></pre>

  To ignore macros and force using search engine press <kbd><font size=3>Ctrl</font></kbd>

- #### **Macros menu**:

  Macros can be pinned to macros menu.

  **_Controls_**:

  - **open/close**:

    - the _macros menu toggle button_ in the right bottom corner
      > **Note**
      > The macros menu toggle button will appear only on hover after you click it at least once
    - <kbd><font size=3>RMB</font></kbd>
    - <kbd><font size=3>Shift</font></kbd>

  - **navigation**:

    - <kbd><font size=3>←</font></kbd> <kbd><font size=3>→</font></kbd>
    - mouse wheel
    - drag

- #### **Hotkeys**:

  You can use hotkeys to quickly call macros which have `key` property.

  <kbd><font size=3>Shift</font></kbd> + \<**key**\>

  > macro must be `pinned`

- #### **ChatGPT**:

  Before using ChatGPT you need to specify your [OpenAI API key](https://platform.openai.com/account/api-keys) in `Settings` &rarr; `Query` &rarr; `AI` &rarr; `Api key`.

  > the key is stored locally on your computer

  To use ChatGPT integration double press <kbd><font size=3>Space</font></kbd> after you typed a query.

## Configuration

### Settings

You can configure main functionality of the app in **Settings**.

To open **Settings**, click on the _gear icon_ in the top right corner.

You can click the _show/hide_ icon at the bottom of the **Settings** window to show advanced settings.

> **Note**
> The gear icon will appear only on hover after you visit **Settings** at least once

### config.js

You can edit **_Macros_** and **_Commands_** only in the `/config.js` file yet.

`/config.js` contains a single JS object named **CONFIG** which has 3 properties:

- **macros** `Array`

  structure:

  ```javascript
  {
    name: string, // macros name
    category: string, // category of the macros
    url: string, // full macros URL
    normalisedURL: string, // normalised URL (secondLevelDomain + '.' + firstLevelDomain)
    triggers: [ string, ... ], // list of triggers
    commands: { // commands of the macro
      [type]: {
        // {@} - macros URL
        // {$} - command argument
        template: string, // URL template
        description (optional): string // description of the command for this macros
      }
    },
    bgColor: complexColor, // background color
    textColor: string, // text color
    pinned: boolean, // is the macros pinned in the Macros Menu
    key: (optional): string, // hotkey ('key' + <keyName>)
    icon: (optional): string // the name of the icon in the "/icons.js" file
  }
  ```

- **commands** `Array`

  structure:

  ```javascript
  {
    type: string, // command type (name)
    trigger: string // command trigger (preferably a symbol)
  }
  ```

- **engines** `Object`

  structure:

  ```javascript
  {
    name: string, // engine name
    bgColor: complexColor, // background color
    textColor: string, // text color
    types: { // query, calculator, currency, ...
      [type]: {
        // {@} - raw query (what user typed)
        // {$} - parsed query (what is in the query field)
        template: string // URL template
      }
    }
  }
  ```

Because of the limitations of the CORS policy, macros icons must be stored in `/icons.js` in the `ICONS` object. You can put there any valid HTML SVG as a string

> **Warning**
> be aware of quotes

## TODO

- [ ] The _"Legacy"_ mode
- [x] Macros menu toggle button
- [ ] Weather widget
- [ ] Settings description
- [ ] Redirect button
- [x] Force search engine on <kbd>Ctrl</kbd>
- [ ] Fix transition animations
- [ ] Macros and Commands editor
- [ ] Macros Menu categories
- [ ] Localisation
- [x] LocalStorage reset buttons
- [ ] Refactor search engines system
- [ ] Time settings

## Technologies

- [React](https://reactjs.org/)
- MUI ([Joy UI](https://mui.com/joy-ui/getting-started/overview/))
- [Framer-motion](https://www.framer.com/motion/)
- [Splide](https://splidejs.com/)
- [Vite](https://vitejs.dev/)

> <font size=2 color=grey>JS, CSS, HTML, <a href="https://github.com/Myndex/SAPC-APCA">APCA</a> (from <a href="https://colorjs.io/">color.js</a>)</font>

---

<p align=center>
inspired by <a href="https://github.com/xvvvyz/tilde">Tilde</a>
</p>
