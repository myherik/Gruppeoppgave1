namespace Gruppeoppgave1.Models
{
    public class Kunde
    {
        public int Id { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string Foedselsdato { get; set; }

        public override string ToString()
        {
            return $"id:{Id}, Fornavn:{Fornavn}, Etternavn:{Etternavn}, Fødselsdato:{Foedselsdato}";
        }

    }
}