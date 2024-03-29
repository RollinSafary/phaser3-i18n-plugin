# Contributing to phaser3-i18n-plugin

## Setup

1 - Clone your fork of the repository:

```
$ git clone https://github.com/RollinSafary/phaser3-i18n-plugin.git
```

2 - Install npm dependencies using yarn:

```
$ yarn install
```

3 - Run start process

```
$ yarn run start
```

4 - Run test process

```
$ yarn test
```

## Guidelines

-   Please try to [combine multiple commits before
    pushing](http://stackoverflow.com/questions/6934752/combining-multiple-commits-before-pushing-in-git).

-   Please use `TDD` when fixing bugs. This means that you should write a unit
    test that fails because it reproduces the issue, then fix the issue and finally run
    the test to ensure that the issue has been resolved. This helps us to prevent
    fixed bugs from happening again in the future.

-   Always format your code using `yarn run autoformat`.

-   Please keep the test coverage at 100%. Write additional unit test if
    necessary.

-   Please create an issue before sending a PR if your commit is going to change the
    public interface of the package or it includes significant architecture
    changes.

-   Feel free to ask for help from me via the
    [github issues](https://github.com/RollinSafary/phaser3-i18n-plugin/issues).
