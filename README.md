# Exam Portal Front with Flipt Feature Flag

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Docker commands

```sh
docker build -t sujithes/exam-portal-ui .

docker tag sujithes/exam-portal-ui sujithes/exam-portal-ui:1

docker push sujithes/exam-portal-ui:1
```

### Local execution

```bash
docker-compose -f docker-compose.yml up 
```


### Prod execution
```bash
docker-compose -f docker-compose.prod.yml up
```
 
