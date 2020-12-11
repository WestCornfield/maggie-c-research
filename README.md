# Maggie C Research

## To download this project,

Open up your terminal

```
git clone https://github.com/WestCornfield/maggie-c-research.git
```

## To use this project

From the same directory you downloaded the git repo to,


## Recent Search
This call will go through recent tweets

```
cd maggie-c-research

node recent-search.js
```

## Full Archive Search
This call will go through the full twitter archive

You can either call this node script with no arguments or with two arguments, first being the fromDate, second being the toDate.

```
cd maggie-c-research

node full-archive-search.js
```

OR

```
cd maggie-c-research

node full-archive-search.js 202010010000 202011010000
```

## FAQ

### When I run the command, it doesn't do anything!

In the terminal, try running ```brew install node``` first.

### Brew doesn't work either!

Let's start from the beginning =>

In order:

```git clone https://github.com/WestCornfield/maggie-c-research.git```

```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```

```brew install node```

Then run the commands you would like.
