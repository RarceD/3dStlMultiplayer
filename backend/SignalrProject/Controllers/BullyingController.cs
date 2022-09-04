using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalrProject.Controllers.Dto;
using SignalrProject.DB;
using SignalrProject.Model;
using System.Text.Json;

namespace SignalrProject.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class BullingController : ControllerBase
    {
        private DbBulling _dbBulling;

        private List<string> _fantasticWords;
        public BullingController(DbBulling dbClient)
        {
            _dbBulling = dbClient;
            _fantasticWords = _dbBulling.LoadFantasticWords();
        }

        #region GET

        [HttpGet]
        public List<WeddingMsgDto> GetAll(string? delete)
        {
            if (delete == null)
            {
                return _dbBulling.AllMsg();
            }
            else
            {
                _dbBulling.DeleteMessage(Int32.Parse(delete));
                return _dbBulling.AllMsg();
            }
        }
        #endregion

        [HttpPost]
        public string AddMsg(WeddingMsgReceived input)
        {
            if (input.Msg == "") return "false";

            string result = IsSuccessfullMsg(input);
            if (result == String.Empty)
                result = "ok";
            _dbBulling.AddMsg(input.Msg);
            return result;
        }

        private string? IsSuccessfullMsg(WeddingMsgReceived input)
        {
            var slutStr = input.Msg.ToString().ToLower();
            foreach (string? w in _fantasticWords)
            {
                if (slutStr.Contains(w.ToLower()))
                    return w;
            }
            return String.Empty;
        }


    }
}

