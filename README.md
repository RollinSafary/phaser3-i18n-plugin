# Phaser 3 i18n plugin

## how to install

`npm i @candywings/phaser3-i18n-plugin@latest`

## About

Based on standard Model-View-Controller architecture with extended functionality in TypeScript.

## Added functionalities.
1. Mediator have `sleep():void` and `wake():void` functions, which  give ability to stop and start mediator from listening notifications dynamically.
2. Mediator have `subscribeToNotifications(...notificationNames: string[]):void` and `unsubscribeToNotification(notificationName: string):void` functions, which  give ability to dynamically subscribe and unsubscribe listening notifications. `listenNotificationInterests: string[]` now is a `getter` not a `function`.
3. Now it's allowed to have same mediator-view pairs, so for every mediator instance unique id will be generated, which is available in mediator in `id: number | string` property.
4. Now mediator has `setMediatorId(id: number| string):void` function to set id manually to sync mediator with object in `VO` and `getMediatorId(): number | string` to get it;
5. Now `facade.retrieveMediator(mediatorName: string, id?: number| string):Mediator` function has optional second property `id: number | string`. It's for cases where you have multiple instances of same mediator-view pairs. Using `retrieveMediator` function without giving `id: number | string` argument, it will return first mediator from mediators with given name.
6. Now `Facade` has methods `hasMediatorWithName(mediatorName: string):boolean`, which will check if there is at least one mediator with given name, and method `retrieveMediators(mediatorName:string): Mediator[]`, which will return all mediators with given name.
7. Now facade has new function `getMediatorsCount(mediatorName: string): number` which returns count of Mediator with same name. It's for cases, when you want to write you own logic based on Mediator count.
8. Mediator have `index:number` property which shows the index in the same name mediators' list.
9. Same notification can call multiple commands. Functions are added to remove commands from notification's call queue. To remove single command from call queue call `removeCommand(notificationName:string, command:SimpleCommand):void` on facade, and to remove all commands from notification's queue call `removeCommands(notificationName: string):void` on facade.
10. To register command to work once use `registerCommandOnce(notificationName, command):void` on facade. It will be called only once, then it will be removed from commands queue.
11. Added `Guard` for command, it can be used to make checks before command will `execute`, it has reference to `Facade` too. `Guard` has `abstract approve(notificationName: string, ...args: any[]):boolean | Promise<boolean>` function which must be overridden. Async usage of `approve` function is possible.
12. Added `addGuard(...guardClassRefs: Guard[]):void`, `Guard` classes (not their instances) need to be given as arguments.
13. Added `onAnyGuardApproved(notificationName: string, ...args: any[]):void`, `onAnyGuardDenied(notificationName, ...args: any[]):void` and `onAllGuardsDenied(notificationName, ...args: any[]):void` functions for handling guards approving cases.
14. Command has protected method `prepare():void`, which is provided to add guards.
15. Command execution is being done in following sequence, <br>`prepare -> checkGuards -> execute || onAnyGuardDenied && onAllGuardDenied`
16. MacroCommands now can add `exclusiveSubCommands`, so if on of added subCommands is approved, others won't event checked. To add `exclusiveSubCommand` call `addExclusiveSubCommand(command, ...guards)`. Note that `exclusiveSubCommand`'s check is checking subCommand's self guards too. Even if you've added duplicate guards, exclusiveSubCommand checker will check only unique guards.
17. Added `registerMediators` and `removeMediators` functions.
