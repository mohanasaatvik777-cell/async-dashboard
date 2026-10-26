# Interview Answers

## 1. Microtasks vs macrotasks
Ans. The execution flow will be sync code+ microtaksks+ macrotasks this is the order of the exection. Where microtasks is execution of async code which contains the promises, async/await this things. While macrotasks is execution of async where it contains like the setInterval, setTimeout etc.

Predicted Output: 3, 2, 1

## 2. When to use Promise.allSettled instead of Promise.all
Promise.allSettled is used where is return a result of array with dict where it waits for every ones response whether it is resolved or rejected. Then Promise.all is used when a rejection came then it stops immediately even some other other and give error, here it is not awaiting for everyone to complete if rejection came then it will exit.

## 3. git merge vs rebase, and git reset vs revert
git merge and rebase: Here in merge it combines both branch works in the extra commit. In rebase the latest commit is placed on the top as if some one branch as if it is done by you. A single history line.

git reset vs revert: I moves the pointer to the back versions, where it is dangerous for shared branch, because other will see your version although you reset. But in revert there is no going back, making this as our suitable one, by going forward.