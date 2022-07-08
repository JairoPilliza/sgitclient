namespace deceserver.Models.Intervencion
{
    public class DeceResultadosRecomendacionesViewModel
    {
        public int idDeceIntervencion { get; set; }
        public List<DeceIntervencionResultadoObtenido>? res { get; set; }
        public List<DeceIntervencionObsRecomendacion>? ior { get; set; }

    }
}
