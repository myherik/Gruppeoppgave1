using System.ComponentModel.DataAnnotations;

namespace Gruppeoppgave1.Models
{
    public class Reise
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Strekning { get; set; }
        [Required]
        public int PrisPerGjest { get; set; }
        [Required]
        public int PrisBil { get; set; }
        [Required]
        public string BildeLink { get; set; }
        [Required]
        public string Info { get; set; }
        [Required]
        public bool MaLugar { get; set; }

        public override string ToString()
        {
            return $"{Id}";
        }
    }
}