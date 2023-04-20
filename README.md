# New Relic Notice Error Agent
This is a docker image used to notice errors to new relic in the argo workflow
<br />
<br />

# Getting Started
First test your new relic account connection. Make a `.env` file with the `.env.example` and filling in the variables.
<br />

`error_message` is the error message you would like to send to new relic. 

`workflow_name` is the name of workflow.

`workflow_status` is the status of workflow.

`workflow_duration` is the duration of workflow.

<br />

Next, install the package and test the connect.

```
// Install the package
npm install

// Test the connect
node error-agent.js
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
-e ARGO_WORKFLOW_ERROR="<error_message>" \
-e ARGO_WORKFLOW_NAME="<workflow_name>" \
-e ARGO_WORKFLOW_STATUS="<workflow_status>" \
-e ARGO_WORKFLOW_DURATION="<workflow_duration>" \
error-agent 
```
<br />

`newrelic_apps_name` is the the application name used in new relic. You can use it to search the error message of your application.

`newrelic_license_key` is the license key of your new relic account.

`function_name` is the function name of your application function.

`error_message` is the error message you would like to send to new relic. 

`workflow_name` is the name of workflow.

`workflow_status` is the status of workflow.

`workflow_duration` is the duration of workflow.

<br />

Example:

```
docker run --rm -it \
-e NEWRELIC_APP_NAME="ABCDDD" \
-e NEWRELIC_LICENSE_KEY="XXXXXXXXXXXXXXXXXXXXX" \
-e FUNCTION_NAME="TestFunction" \
-e ARGO_WORKFLOW_ERROR="This is a test error" \
-e ARGO_WORKFLOW_NAME="test" \
-e ARGO_WORKFLOW_STATUS="test" \
-e ARGO_WORKFLOW_DURATION="test" \

error-agent \
```
# Docker Hub
[Image url](https://hub.docker.com/repository/docker/johnku001/newrelic-notice-error-agent/general)
