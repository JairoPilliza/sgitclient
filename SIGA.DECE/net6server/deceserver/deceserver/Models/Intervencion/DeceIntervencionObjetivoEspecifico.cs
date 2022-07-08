namespace deceserver.Models.Intervencion
{
    public class DeceIntervencionObjetivoEspecifico
    {
        public int idDeceIntervencionObjetivoEspecifico { get; set; }
        public int idDeceIntervencionObjetivoGeneral { get; set; }
        public string? objEspecifico { get; set; }
        public string? objEspecifico2 { get; set; }
        public string? objEspecifico3 { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
