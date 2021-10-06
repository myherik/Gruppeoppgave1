using System.ComponentModel.DataAnnotations;

namespace Gruppeoppgave1.Models
{
    public class Kunde
    {
        public int Id { get; set; }
        [Required]
        [RegularExpression("^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){1,}$")]
        public string Fornavn { get; set; }
        [Required]
        [RegularExpression("^[A-ZÆØÅ]{1}[a-zæøå]{0,}$")]
        public string Etternavn { get; set; }
        [Required]
        [RegularExpression("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$")]
        public string Foedselsdato { get; set; }

        public override string ToString()
        {
            return $"id:{Id}, Fornavn:{Fornavn}, Etternavn:{Etternavn}, Fødselsdato:{Foedselsdato}";
        }

    }
    
    public class Voksen: Kunde {}
    public class Barn: Kunde{}

    public class KontaktPerson: Kunde{
        [Required]
        public string Adresse { get; set; }
        [Required] 
        public virtual Post Post { get; set; }
        [Required]
        public string telefon { get; set; }
        [Required]
        [RegularExpression(@"^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$")]
        public string Epost { get; set; }
    }
}