using deceserver.Daos;
using deceserver.Models;
using deceserver.Resources;

namespace deceserver.Services
{
    public class LoginService
    {
        private StructureResponse _result = new StructureResponse();
        private JwtResource _JwtSRC = new();
        private readonly LoginDao _l = new();
        public async Task<StructureResponse> Auth(AuthModel? auth)
        {
            try
            {
                _result.toString("0", "token invalido", "");

                if (auth == null)
                    return _result;

                _result.toString("1", "token valido", "");

                LogInVIewModel login = new LogInVIewModel();                
                login.roles = await _l.GetRolesAsync(auth.idUsuario);
                login.menus = await _l.GetMenusAsync(auth.idRol);
                _result.payload = login;
            }
            catch (Exception e)
            {
                _result.toString("0", "Credenciales no generadas", "", e.Message);
            }
            return _result;
        }
        public async Task<StructureResponse> LogIn(AuthModel? auth)
        {
            try
            {
                _result.toString("0", "token invalido", "");

                if (auth == null)
                    return _result;

                _result = await _l.PostAsync(auth);

                auth = _result.payload as AuthModel;

                string token = _JwtSRC.Create(auth);

                if (string.IsNullOrEmpty(token))
                    _result.toString("0", "Credenciales no generadas", "");

                if (_result.code == "1")
                {
                    LogInVIewModel login = new LogInVIewModel();
                    login.token = token;
                    login.roles = await _l.GetRolesAsync(auth.idUsuario);
                    login.menus = await _l.GetMenusAsync(auth.idRol);
                    _result.payload = login;
                }
            }
            catch (Exception e)
            {
                _result.toString("0", "Credenciales no generadas", "", e.Message);
            }
            finally
            {
            }
            return _result;
        }

        //public RolModel? GetAcceso(List<RolModel> items) => items.FirstOrDefault(x => x.predeterminado == true);
    }
}
