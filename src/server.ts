import appInstance from "./app";

var PORT = process.env.PORT || 3000;
appInstance.listen(PORT, () => console.log(`listening on port ${PORT}`));