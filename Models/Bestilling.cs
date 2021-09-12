using System.Collections.Generic;
using System.Linq;

namespace Gruppeoppgave1.Models
{
    public class Bestilling
    {
        public int Id { get; set; }
        public string Ferjestrekning { get; set; }
        public string UtreiseDato { get; set; }
        public string HjemreiseDato { get; set; }
        public string Registreringsnummer { get; set; }
        public List<Kunde> Voksne { get; set; }
        public List<Kunde> Barn { get; set; }
        
        public override string ToString()
        {
            return $"Id:{Id}, Ferjestrekning:{Ferjestrekning}, Utreisedato:{UtreiseDato}, HjemreiseDato:{HjemreiseDato}, " +
                   $"Registreringsnummer:{Registreringsnummer}, Voksne:{string.Join(",", Voksne)}, Barn:{string.Join(",", Barn)}";
        }
    }
}