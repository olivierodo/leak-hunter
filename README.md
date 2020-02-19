# leak-hunter

> A Job that looking for API credential leaks across different platforms (ex: github).
  We love all Apis however the Golden rule is: **Never trust a Partner when he swears that he will be cautious with your api credentials**

## Description

As your are allowing anyone to reuse your api, you MUST be concerned about the credentials that you share with people and potential leaks on platform like github or gitlab, etcc....
This project is a simple way to check if any of our crendential has been leaked on some platform and notify you. 

__This project can help you but please consider to use the [Token scanning service](https://developer.github.com/partnerships/token-scanning/) for a more preventive security__

## Usage

### Dependencies

  * github accessToken
  * gitlab accessToken (TODO)
  * bitbucket accessToken (TODO)
  * Slack webhook url 

### Setup :computer:

  * Set your environment variables ```cp .env.sample .env``` then edit your `.env` file.
  * Install dependencies using ``` npm install ``` or ``` yarn ```.

  
### Run :running:


  Get command documentation
  
  ```
  ./hunt -h
  ```

### Tests :mag:

  * Code style
    ```
    npm run lint
    ```

## Automation

If you want to run the command as a Job on Kuvernetes just run the command : 

Update the configmap on the file [kubernetes-definition.yml](kubernetes-definition.yml)


Then run the command

```
$ kubectl -f kubernetes-definition.yml
```

Then you can chack the job by running 

```
$ kubectl get jobs
```

TODO

* Bitbucket integration
* Gitlab integraton

## License

[MIT License](./LICENSE)
