﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Gruppeoppgave1.Models
{
    public class Bestilling
    {
        public int Id { get; set; }
        [Required]
        [RegularExpression("^[A-Z][a-z]*[-][A-Z][a-z]*$")]
        public string Ferjestrekning { get; set; }
        [RegularExpression("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$")]
        [Required]
        public string UtreiseDato { get; set; }
        [RegularExpression("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$")]
        public string HjemreiseDato { get; set; }
        [RegularExpression("^[A-Z]{2}\\s[1-9]{1}[0-9]{4}$")]
        public string Registreringsnummer { get; set; }
        [Required]
        public virtual List<Voksen> Voksne { get; set; }
        public virtual List<Barn> Barn { get; set; }
        
        public override string ToString()
        {
            return $"Id:{Id}, Ferjestrekning:{Ferjestrekning}, Utreisedato:{UtreiseDato}, HjemreiseDato:{HjemreiseDato}, " +
                   $"Registreringsnummer:{Registreringsnummer}, Voksne:{string.Join(",", Voksne)}, Barn:{string.Join(",", Barn)}";
        }
    }
}