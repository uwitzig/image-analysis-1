# Watson Hands On Labs - 📷 Image Analysis.

The labs cover several [Watson Services][wdc_services] that are available on [IBM Bluemix][bluemix] to build a simple image analysis application. Throughout the workshop, we will navigate through Bluemix, Bluemix Devops Services, Github, and the source code of our application in order to demonstrate how apps can be created quickly and easily using the [IBM Bluemix][bluemix] platform, and the value of [Watson Services][wdc_services] and Cognitive capabilities through APIs.

So let’s get started. The first thing to do is to build out the shell of our application in Bluemix.

## Creating a [IBM Bluemix][bluemix] Account

  1. Go to [https://bluemix.net/](https://bluemix.net/)
  2. Create a Bluemix account if required.
  3. Log in with your IBM ID (the ID used to create your Bluemix account)

**Note:** The confirmation email from Bluemix mail may take up to 1 hour.


## Create visual_recognition and text_to_speech service in [IBM Bluemix][bluemix]

1. Install the cloudfoundry CLI needed to connect to Bluemix from command line:

   https://github.com/cloudfoundry/cli/releases

2. Run the following commands to connect to your Bluemix account:

    `cf api https://api.ng.bluemix.net/` for "US South" or 
    
    `cf api https://api.eu-gb.bluemix.net/` for "United Kingdom" region

    `cf login -u <<your Bluemix account>>`

    When prompted, enter your Bluemix password

3. Visual Recognition service

    Get information about the service: 
    
    `cf marketplace -s watson_vision_combined`

    Create the free service with name my-visual-recognition:
    
    `cf create-service watson_vision_combined free my-visual-recognition`

    Generate authentication credentials: 
    
    `cf create-service-key my-visual-recognition credentials-1`

    Retrieve the new credentials: 
    
    `cf service-key my-visual-recognition credentials-1`

4. Text-to-Speech service

    Create the standard service with name my-text-to-speech:
    
    `cf create-service text_to_speech standard my-text-to-speech`

    Generate authentication credentials:
    
    `cf create-service-key my-text-to-speech credentials-1`

    Retrieve the new credentials:
    
    `cf service-key my-text-to-speech credentials-1`


## Configure and run this application locally

The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) so you will have to download and install them as part of the step 1 below.

1. Install [Node.js] from http://nodejs.org/

2. Clone the app structure and files that is hosted on github

   https://github.com/uwitzig/image-analysis/


3. Edit config.js to add the credentials previously retrieved. (visual_recognition and text_to_speech)

   Leave the credentials for the language-translator empty for now.
   
4. Save the config.js file   

5. Go to the project folder in a terminal and run the following command to install all dependencies

    `npm install`

6. Start the application

    `npm start`

7. Test the application at: http://localhost:3000

   You can select an image to classify it

   At this point you can classify images and use the text_to_speech service.

## Add language translation services to the application

In this section we'll see how to add the possibility of translating the text recognized to an other language before it's spoken by the Text-to-Speech service

1. Create a language translation service

    Create the standard service with name my-language-translator:
    
    `cf create-service language_translator standard my-language-translator`

    Generate authentication credentials: 
    
    `cf create-service-key my-language-translator credentials-1`

    Retrieve the new credentials: 
    
    `cf service-key my-language-translator credentials-1`

3. Edit the config.js file to add the new language translation service credentials, save the file

4. In app.js, uncomment line 33

5. Save

6. Restart the app

7. Test the application at: http://localhost:3000

   Select an image to classify it

   At this point you can classify images, translate the classifier to german and use the text_to_speech service.

## Deploy the application to IBM Bluemix

You will need to create the "manifest.yml" file. This is a helper file for identifying and pushing the application up to the IBM Bluemix environment. You can use this file to declare the resources an metadata required for you application to run in Bluemix. This file can also be used to bind existing services to your application.

1. Create the following file and open it with a text/code editor:

   .../image-analysis-master/manifest.yml
   
2. At line 1, enter the following lines:

```js
applications:
- services:
  - my-text-to-speech
  - my-visual-recognition
  - my-language-translator 
  domain: mybluemix.net
  name: image-analysis
  host: image-analysis-<yourUniqueName>
  path: .
  disk_quota: 1024M
  memory: 512M
```

3. Each application hosted in IBM Bluemix needs to have a unique sub-domain. In order to distinguish your application from other developers that may have gone through this exercise, you should replace `<yourUniqueName>`with your initials to the host entry in the file. For example it might look like:

```js
host: image-analysis-uwi
```

4. If you have your watson services created in the "United Kingdom" instead of the "US South" region then change the domain to "eu-gb.bluemix.net". In this case your domain entry has to be like this:

```js
domain: eu-gb.bluemix.net
```

5. Save and close the file

6. Create the following file and open it with a text/code editor:

   .../image-analysis-master/.cfignore
   
7. When you installed the required Node modules for your application, they were placed in a subdirectory named "node_modules". You do not need to upload these libraries to Bluemix. The PaaS will provide them for you. At line 1, enter the followin lines:

```js
node_modules
```

8. Save and close the file

9. Next, you need to actually push your application to IBM Bluemix. Return to your terminal/command window and enter the following commands. You should execute these commands in the .../image-analysis-master/ directory.
  
    `cf api https://api.ng.bluemix.net/` for "US South" or 
    
    `cf api https://api.eu-gb.bluemix.net/` for "United Kingdom" region

    `cf login -u <<your Bluemix account>>`

    When prompted, enter your Bluemix password
    
    `cf push`
    
10. The Cloud Foundry command-line tool will examine the contents of manifest.yml and package.json and push your application to IBM Bluemix. Wait for the application to stage and enter a running state before proceeding. Take a note of the deployed URL for your application.

11. Exit the CF tool with command:

    `cf logout`

12. Your Node.js application is now running in the cloud! Open a browser an enter the URL for your application you noted in step 10 to test your application.


# Congratulations
You have completed the Image Analysis Lab! :bowtie:

[bluemix]: https://console.ng.bluemix.net/
[wdc_services]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/services-catalog.html
[lt_service]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/language-translation.html
