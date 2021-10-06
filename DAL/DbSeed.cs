using System;
using System.Linq;
using Gruppeoppgave1.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Gruppeoppgave1.DAL
{
    public static class DbSeed
    {
        public static void SeedDb(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<MyDBContext>());
            } 
        }

        private static void SeedData(MyDBContext db)
        {
            if (!db.Reiser.Any())
            {
                var reise1 = new Reise
                {
                    Strekning = "Oslo-Kiel",
                    PrisPerGjest = 700,
                    PrisBil = 700,
                    BildeLink = "./res/Color_Magic.jpeg",
                    Info = "Det " +
                           "lønner seg å bestille tidlig, da sikrer du deg en god pris og plass på ønsket avgang. Overfarten med " +
                           "SuperSpeed fra Kristiansand tar kun 3 timer og 15 minutter. Medlemmer av Color Club får de beste prisene " +
                           "på bilpakke til Danmark.",
                    MaLugar = true
                };
                var reise2 = new Reise
                {
                    Strekning = "Larvik-Hirtshals",
                    PrisPerGjest = 300,
                    PrisBil = 700,
                    BildeLink = "./res/SuperSpeed_2.jpg",
                    Info = "Overfarten med SuperSpeed" +
                           " fra Larvik tar kun 3 timer og 45 minutter. Det lønner seg å bestille tidlig, da sikrer du deg god pris" +
                           " og plass på ønsket avgang. Medlemmer av Color Club får de beste prisene på bilpakke til Danmark.",
                    MaLugar = false
                };
                var reise3 = new Reise
                {
                    Strekning = "Kristiansand-Hirtshals",
                    PrisPerGjest = 350,
                    PrisBil = 700,
                    BildeLink = "./res/SuperSpeed_2.jpg",
                    Info = "Det " +
                           "lønner seg å bestille tidlig, da sikrer du deg en god pris og plass på ønsket avgang. Overfarten med " +
                           "SuperSpeed fra Kristiansand tar kun 3 timer og 15 minutter. Medlemmer av Color Club får de beste prisene " +
                           "på bilpakke til Danmark.",
                    MaLugar = false
                };
                var reise4 = new Reise
                {
                    Strekning = "Sandefjord-Strömstad",
                    PrisPerGjest = 100,
                    PrisBil = 700,
                    BildeLink = "./res/Color_Hybrid.jpeg",
                    Info = "Kjør " +
                           "bilen om bord og nyt overfarten fra Sandefjord til Strømstad på kun 2 ½ time. Underveis kan du slappe av," +
                           " kose deg med et godt måltid og handle taxfree-varer til svært gunstige priser. TIPS! Det lønner seg å " +
                           "være medlem av Color Club, da får du blant annet gratis reise med bil på flere avganger, og ytterligere " +
                           "10% rabatt på en mengde varer.",
                    MaLugar = false
                };

                db.Reiser.AddRange(reise1, reise2, reise3, reise4);

                var lugar1 = new Lugar
                {
                    Antall = 4,
                    Reise = reise1,
                    Pris = 500,
                    Type = "***"
                };
                
                var lugar2 = new Lugar
                {
                    Antall = 4,
                    Reise = reise1,
                    Pris = 800,
                    Type = "****"
                };
                
                var lugar3 = new Lugar
                {
                    Antall = 2,
                    Reise = reise1,
                    Pris = 1200,
                    Type = "*****"
                };
                
                var lugar4 = new Lugar
                {
                    Antall = 4,
                    Reise = reise2,
                    Pris = 500,
                    Type = "***"
                };
                
                var lugar5 = new Lugar
                {
                    Antall = 4,
                    Reise = reise3,
                    Pris = 500,
                    Type = "***"
                };
                
                var lugar6 = new Lugar
                {
                    Antall = 4,
                    Reise = reise4,
                    Pris = 400,
                    Type = "***"
                };
                
                db.Lugarer.AddRange(lugar1, lugar2, lugar3, lugar4, lugar5, lugar6);

                string[] linesPost = System.IO.File.ReadAllLines("DAL/post.sql");
                foreach (var s in linesPost)
                {
                    try
                    {
                        db.PostSteder.Add(new Post
                        {
                            PostNummer = s.Split("'")[1],
                            PostSted = s.Split("'")[3]
                        });
                    }
                    catch
                    {
                        Console.WriteLine(s);
                    }
                    
                }
                
                db.SaveChanges();
                Console.WriteLine("--> Seeding");
            }
        }
        
    }
}