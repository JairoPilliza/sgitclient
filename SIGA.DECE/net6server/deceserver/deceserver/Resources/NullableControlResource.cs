namespace deceserver.Resources
{
    public class NullableControlResource
    {
        public object? NullableSave(object? obj)
        {
            return obj ?? null;
        }
    }
}
