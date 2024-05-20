from pydantic import BaseModel
class URL_Source(BaseModel): # classe q define as fontes de conhecimento para dps serem guardadas na bd
    url: str
    paths: list[str]
    update_period: str | int
    description: str
    wait_time: int = 3 
    recursive: bool = False
      
class File_Source(BaseModel): # classe q define as fontes de conhecimento para dps serem guardadas na bd
    file_name: str
    file_path: str
    loader_type: str
    description: str