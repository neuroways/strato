TT Backend Autoload Hotfix

Upload the ZIP into:
neuroways_dev/modules/neuroplay/nlp_tennis_tournament/backend/

Then extract it there.

After extraction this file must exist:
backend/vendor/autoload.php

This is a temporary Composer-free PSR-4 autoloader.
It is intended only to unblock the current Strato-first deployment.
Later replace vendor/ with the real Composer-generated vendor directory.
