# Windrunner Ui
Angular front end that works with the [windrunner server](https://github.com/neilsonwong/windrunner) to provide a simple web interface for watching videos. The [windrunner agent](https://github.com/neilsonwong/windrunner-agent) client application is required for playback.

My daily use instance is setup **[HERE](https://windrunner2.netlify.app)**!

## Features
This version of Windrunnner has been designed from the ground up to bring the user the things they want to see with minimal clicks. 

### Ease of Access
New files are automatically detected and grouped by series on the home page! The automatically detected series metadata (including thumbnail) provides useful information as well as a prettier look and feel.

![](https://raw.githubusercontent.com/neilsonwong/windrunner-ui/master/home.jpg)

Series can also be favourited such that they show up on the home page. Useful for older shows that will not be updated.

### Browse Media Directory
Manual navigation through the shared media directory is possible. The application is smart and whenever it thinks a folder is contains a series grouping, it will switch over to the series view.

### Series View
This view provides an overview of the series. The newest files are grouped at the top for ease of access. Especially useful when there are a lot of files in the directory.

![](https://raw.githubusercontent.com/neilsonwong/windrunner-ui/master/series.jpg)

### API Proxy Switching
The application makes use of two potential routes to the API. It can either hit the API through the internet (by default) OR if it detects that the user has installed the windrunner agent, then it will instead proxy all requests through the agent (locally) to the local instance of the windrunner server. This was implemented to avoid routing traffic through the internet unecessarily.

## How to set up
This is setup similar to any standard angular project. 
`ng build --prod` will build the project into a static site deployable project. 

### Environment File
As this application is coupled with the windrunner server, you will need an instance to service the application. The server address is configurable within the `environment.prod.ts`

| Setting     | Purpose                                                    |
| ----------- | ---------------------------------------------------------- |
| api         | Windrunner Server address                                  |
| apiPrefix   | Route to hit the API                                       |
| agent       | Windrunner Agent address (expected to be http://127.0.0.1) |
| proxyPrefix | Agent Proxy Route (used to save on internet traffic)       |

The proxy address is used to allow the agent to act as a local proxy to the windrunner server.