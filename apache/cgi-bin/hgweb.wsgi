from mercurial import demandimport; demandimport.enable()
from mercurial.hgweb.hgwebdir_mod import hgwebdir

application = hgwebdir('/usr/lib/cgi-bin/hgweb.conf')
