"""JUnit z `node --test` → wejście dla Allure (klocek „raport”): luźne <testcase> w <testsuites> owinięte w <testsuite>,
bo Allure bez tego pokazuje 0 testów. Czyta raporty/junit, pisze raporty/allure-wejscie."""
import glob, os, xml.etree.ElementTree as ET

os.makedirs('raporty/allure-wejscie', exist_ok=True)
for f in glob.glob('raporty/junit/**/*.xml', recursive=True):
    t = ET.parse(f)
    r = t.getroot()
    luzem = [c for c in list(r) if c.tag == 'testcase'] if r.tag == 'testsuites' else []
    if luzem:
        s = ET.SubElement(r, 'testsuite', name=os.path.splitext(os.path.basename(f))[0], tests=str(len(luzem)))
        for c in luzem:
            r.remove(c)
            s.append(c)
    t.write(os.path.join('raporty/allure-wejscie', os.path.relpath(f, 'raporty/junit').replace('/', '_')), encoding='utf-8', xml_declaration=True)
