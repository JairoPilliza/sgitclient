namespace deceserver.Models.Intervencion
{
    public class DeceIntervencionObjetivoGeneral
    {
        public int idDeceIntervencionObjetivoGeneral { get; set; }
        public int? idDeceIntervencion { get; set; }
        public string? descripcion { get; set; }
        public DeceIntervencionObjetivoEspecifico? esp { get; set; }
        public DeceIntervencionAccionEstrategia? acc { get; set; }
        
        public DateTime fechaRegistro { get; set; }
    }
}
