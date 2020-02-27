const baseURL = '/';
const indexURL = '/index.html';
const networkFetchEvent = 'fetch';
const swInstallEvent = 'install';
const swInstalledEvent = 'installed';
const swActivateEvent = 'activate';
const staticCachePrefix = 'blazor-cache-v';
const staticCacheName = 'blazor-cache-v1';
const requiredFiles = [
"/_framework/blazor.boot.json",
"/_framework/blazor.webassembly.js",
"/_framework/wasm/mono.js",
"/_framework/wasm/mono.wasm",
"/_framework/_bin/Blazored.LocalStorage.dll",
"/_framework/_bin/Microsoft.AspNetCore.Authorization.dll",
"/_framework/_bin/Microsoft.AspNetCore.Blazor.dll",
"/_framework/_bin/Microsoft.AspNetCore.Blazor.HttpClient.dll",
"/_framework/_bin/Microsoft.AspNetCore.Components.Authorization.dll",
"/_framework/_bin/Microsoft.AspNetCore.Components.dll",
"/_framework/_bin/Microsoft.AspNetCore.Components.Forms.dll",
"/_framework/_bin/Microsoft.AspNetCore.Components.Web.dll",
"/_framework/_bin/Microsoft.AspNetCore.Hosting.Abstractions.dll",
"/_framework/_bin/Microsoft.AspNetCore.Hosting.dll",
"/_framework/_bin/Microsoft.AspNetCore.Hosting.Server.Abstractions.dll",
"/_framework/_bin/Microsoft.AspNetCore.Http.Abstractions.dll",
"/_framework/_bin/Microsoft.AspNetCore.Http.dll",
"/_framework/_bin/Microsoft.AspNetCore.Http.Extensions.dll",
"/_framework/_bin/Microsoft.AspNetCore.Http.Features.dll",
"/_framework/_bin/Microsoft.AspNetCore.Metadata.dll",
"/_framework/_bin/Microsoft.AspNetCore.WebUtilities.dll",
"/_framework/_bin/Microsoft.Bcl.AsyncInterfaces.dll",
"/_framework/_bin/Microsoft.Bcl.HashCode.dll",
"/_framework/_bin/Microsoft.CSharp.dll",
"/_framework/_bin/Microsoft.EntityFrameworkCore.Abstractions.dll",
"/_framework/_bin/Microsoft.EntityFrameworkCore.dll",
"/_framework/_bin/Microsoft.Extensions.Caching.Abstractions.dll",
"/_framework/_bin/Microsoft.Extensions.Caching.Memory.dll",
"/_framework/_bin/Microsoft.Extensions.Configuration.Abstractions.dll",
"/_framework/_bin/Microsoft.Extensions.Configuration.Binder.dll",
"/_framework/_bin/Microsoft.Extensions.Configuration.dll",
"/_framework/_bin/Microsoft.Extensions.Configuration.EnvironmentVariables.dll",
"/_framework/_bin/Microsoft.Extensions.Configuration.FileExtensions.dll",
"/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll",
"/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll",
"/_framework/_bin/Microsoft.Extensions.FileProviders.Abstractions.dll",
"/_framework/_bin/Microsoft.Extensions.FileProviders.Physical.dll",
"/_framework/_bin/Microsoft.Extensions.FileSystemGlobbing.dll",
"/_framework/_bin/Microsoft.Extensions.Hosting.Abstractions.dll",
"/_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll",
"/_framework/_bin/Microsoft.Extensions.Logging.dll",
"/_framework/_bin/Microsoft.Extensions.ObjectPool.dll",
"/_framework/_bin/Microsoft.Extensions.Options.dll",
"/_framework/_bin/Microsoft.Extensions.Primitives.dll",
"/_framework/_bin/Microsoft.JSInterop.dll",
"/_framework/_bin/Microsoft.Net.Http.Headers.dll",
"/_framework/_bin/Mono.Security.dll",
"/_framework/_bin/Mono.WebAssembly.Interop.dll",
"/_framework/_bin/mscorlib.dll",
"/_framework/_bin/netstandard.dll",
"/_framework/_bin/Pwronco.dll",
"/_framework/_bin/Radzen.Blazor.dll",
"/_framework/_bin/System.Collections.Immutable.dll",
"/_framework/_bin/System.ComponentModel.DataAnnotations.dll",
"/_framework/_bin/System.Core.dll",
"/_framework/_bin/System.Diagnostics.DiagnosticSource.dll",
"/_framework/_bin/System.dll",
"/_framework/_bin/System.Linq.Dynamic.Core.dll",
"/_framework/_bin/System.Net.Http.dll",
"/_framework/_bin/System.Reflection.Metadata.dll",
"/_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll",
"/_framework/_bin/System.Text.Encodings.Web.dll",
"/_framework/_bin/System.Text.Json.dll",
"/_framework/_bin/System.Transactions.dll",
"/_framework/_bin/System.Xml.dll",
"/_framework/_bin/System.Xml.Linq.dll",
"/_framework/_bin/WebAssembly.Bindings.dll",
"/_framework/_bin/WebAssembly.Net.Http.dll",
"/assets/icons/apple-touch-icon.png",
"/assets/icons/data-clean.png",
"/assets/icons/default-icon-192x192.png",
"/assets/icons/default-icon-512x512.png",
"/assets/icons/favicon-16x16.png",
"/assets/icons/favicon-32x32.png",
"/assets/icons/favicon.ico",
"/css/bootstrap/bootstrap.min.css",
"/css/bootstrap/bootstrap.min.css.map",
"/css/open-iconic/FONT-LICENSE",
"/css/open-iconic/font/css/open-iconic-bootstrap.min.css",
"/css/open-iconic/font/fonts/open-iconic.eot",
"/css/open-iconic/font/fonts/open-iconic.otf",
"/css/open-iconic/font/fonts/open-iconic.svg",
"/css/open-iconic/font/fonts/open-iconic.ttf",
"/css/open-iconic/font/fonts/open-iconic.woff",
"/css/open-iconic/ICON-LICENSE",
"/css/open-iconic/README.md",
"/css/site.css",
"/index.html",
"/sample-data/weather.json",
"/ServiceWorkerRegister.js",
"/manifest.json"
];
// * listen for the install event and pre-cache anything in filesToCache * //
self.addEventListener(swInstallEvent, event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(requiredFiles);
            })
    );
});
self.addEventListener(swActivateEvent, function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (staticCacheName !== cacheName && cacheName.startsWith(staticCachePrefix)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener(networkFetchEvent, event => {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === baseURL) {
            event.respondWith(caches.match(indexURL));
            return;
        }
    }
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (response.ok) {
                            if (requestUrl.origin === location.origin) {
                                caches.open(staticCacheName).then(cache => {
                                    cache.put(event.request.url, response);
                                });
                            }
                        }
                        return response.clone();
                    });
            }).catch(error => {
                console.error(error);
            })
    );
});
