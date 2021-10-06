using System.ComponentModel.DataAnnotations;

namespace Gruppeoppgave1.Models
{
    public class Post
    {
        [Key] 
        [RegularExpression("^([0-9]{4})$")]
        public string PostNummer { get; set; }
        [Required]
        [RegularExpression("^[A-ZÆØÅ]{1}[a-zæøå]{0,}$")]
        public string PostSted { get; set; }
    }
}