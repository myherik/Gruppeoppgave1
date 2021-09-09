using System;
using System.Threading.Tasks;
using Gruppeoppgave1.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gruppeoppgave1.Controllers
{
    [Route("api/Bestilling")]
    public class BestillingsController:ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> AddBestilling([FromBody]Bestilling bestilling)
        {
            Console.WriteLine(bestilling);
            return Ok();
        }

    }
}