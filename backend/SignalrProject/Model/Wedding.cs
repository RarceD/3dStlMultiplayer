using Microsoft.AspNetCore.Mvc;
using SignalrProject.Controllers.Dto;
using SignalrProject.DB;

namespace SignalrProject.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class WeddingController : ControllerBase
    {
        private DbClients _dbClient;
        public WeddingController(DbClients dbClient)
        {
            _dbClient = dbClient;
        }

        #region GET

        [HttpGet]
        public List<WeddingMsgDto> GetAll()
        {
            return _dbClient.AllMsg();
        }

        #endregion

        [HttpPost]
        public string AddMsg(WeddingMsgReceived input)
        {
            _dbClient.AddMsg(input.Msg);
            return "ok";
        }
    }
}

