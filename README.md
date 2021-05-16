# ABSTAT Front-end

## Dependencies

```
* Node.js
* Angular CLI
```

## install anf build ABSTAT Front-end
```
$ ./install.sh
$ ng build --configuration=<mode> 
Setting up BACKEND and eventually CLUSTER_BACKEND variables in abstat-front-end/src/app/auth.constant.ts
```
Allowed configuration modes are:
- public      # suitable for a read-only ABSTAT deploy
- full-open   # suitable for a full-featured ABSTAT deploy
- full-closed # suitable for a full-featured ABSTAT deploy with authentcation

