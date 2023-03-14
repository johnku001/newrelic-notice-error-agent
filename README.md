# New Relic Notice Error Agent
This is a docker image used to notice errors to new relic in the argo workflow
<br />
# Getting Started
First test your new relic account connection. Make a `.env` file with the `.env.example` and filling in the variables.


`NEWRELIC_APP_NAME` is the the application name used in new relic. You can use it to search the error message of your application.

`NEWRELIC_LICENSE_KEY` is the license key of your new relic account.

`FUNCTION_NAME` is the function name of your application function.

<br />

Next, install the package and test the connect.

```
// Install the package
npm install

// Test the connect
node error-agent.js "<error_message>"
```
<br />
Then, build the docker image.

```
docker build -t error-agent .
```
<br />
Finally, run the image with required env variables and arguments.

```
docker run --rm -it \
-e NEWRELIC_APP_NAME="<newrelic_apps_name>" \
-e NEWRELIC_LICENSE_KEY="<newrelic_license_key>" \
-e FUNCTION_NAME="<function_name>" \
error-agent "<error_message>"
```
<br />

`newrelic_apps_name` is the the application name used in new relic. You can use it to search the error message of your application.

`newrelic_license_key` is the license key of your new relic account.

`function_name` is the function name of your application function.

`error_message` is the error message you would like to send to new relic. 
