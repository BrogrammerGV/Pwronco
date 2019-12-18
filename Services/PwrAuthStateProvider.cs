using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Authorization;
using Blazored.LocalStorage;

namespace Pwronco.Services
{
    public class PwrAuthStateProvider : AuthenticationStateProvider
    {
       private readonly ILocalStorageService _localStorage;
   
        public PwrAuthStateProvider(ILocalStorageService localStorage)
        {
            _localStorage = localStorage;
        }
        public override async Task<AuthenticationState> GetAuthenticationStateAsync()
        { 
            var name = await _localStorage.GetItemAsync<string>("name");
            var identity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, "test"),
            }, "Fake authentication type");

            var user = new ClaimsPrincipal(identity);

            return new AuthenticationState(user);
        }
    }
}