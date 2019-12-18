 **Pwronco - WIP** . 

  <img src="https://i.imgur.com/74oFW4t.png" width="250" height="250">

To Run Pwronco: Navigate to working director and run via CLI of choice. 

1. ```git clone https://github.com/BrogrammerGV/Pwronco.git ```
2. ``` cd Pwronco```
3. ```dotnet restore```
4. ```dotnet build``` *(check for package errors / update accordingly) Must have .net Core 3.1/.netStandard2.1 installed*
5. ```dotnet run```
6. Navigate to http://localhost:5000

note: You can test offline capability and reload on reconnection by killing the .net process, or by closing CLI


Pwronco utilizes the full power of multiple cutting edge Open Source tools for web development.

Highlight Technologies

* .Net Standard2.1 - .Net Core 3.1.0-preview4.19579.2
* Blazor Web Assembly (*preview*)
* PWABuilder 1.0.0
* Radzen UI
* Blazored Local Storage
* EF Core

All features readily available *Client Side* running on Blazor Web Assembly.

*Progressive Web App* - 
PWABuilders aggressive Service Worker generation allows for offline use of this application.


NOTE: 
Need to inlcude this line for local development due to Service Worker generation: 
'''
<ServiceWorkerForce>true</ServiceWorkerForce>
'''

**Sometimes the Service Worker can struggle to clear itself out inside chrome**
**If this happens to you: Clear out your data manually via the Application tab in the Chrome Dev Tools**

 <img src="https://i.imgur.com/zj08Cmc.png=500x500" width="500" height="500">



