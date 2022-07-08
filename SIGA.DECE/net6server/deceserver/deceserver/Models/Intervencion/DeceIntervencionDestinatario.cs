namespace deceserver.Models.Intervencion
{
    public class DeceIntervencionDestinatario
    {
        public int idDeceIntervencionDestinatario { get; set; }
        public int idDeceIntervencion { get; set; }
        public string? destinatario { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
